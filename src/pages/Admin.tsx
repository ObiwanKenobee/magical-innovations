
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Project, fetchProjects, createProject, updateProject, deleteProject } from "@/services/projectService";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    technologies: "",
    demo_url: "",
    github_url: "",
  });

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    loadProjects();
  }, []);

  useEffect(() => {
    // Set form data when editing a project
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        image_url: editingProject.image_url || "",
        technologies: editingProject.technologies.join(", "),
        demo_url: editingProject.demo_url || "",
        github_url: editingProject.github_url || "",
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: "",
        description: "",
        image_url: "",
        technologies: "",
        demo_url: "",
        github_url: "",
      });
    }
  }, [editingProject]);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/admin',
      },
    });
    
    if (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse technologies from comma-separated string to array
    const technologiesArray = formData.technologies
      .split(",")
      .map(tech => tech.trim())
      .filter(tech => tech !== "");
      
    const projectData = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      technologies: technologiesArray,
      demo_url: formData.demo_url || null,
      github_url: formData.github_url || null,
    };
    
    if (editingProject) {
      // Update existing project
      await updateProject(editingProject.id, projectData);
      setEditingProject(null);
    } else {
      // Create new project
      await createProject(projectData);
    }
    
    // Refresh projects list
    loadProjects();
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      image_url: "",
      technologies: "",
      demo_url: "",
      github_url: "",
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      loadProjects();
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      technologies: "",
      demo_url: "",
      github_url: "",
    });
  };

  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-md">
              <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
              <p className="mb-6 text-center">Please log in to access the admin dashboard.</p>
              <Button onClick={handleLogin} className="w-full">
                Login with GitHub
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4 py-8">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Project Management</h1>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
            
            {/* Project Form */}
            <div className="mb-10 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border border-gray-300 bg-white/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Image URL</label>
                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border border-gray-300 bg-white/10"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 bg-white/10"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 bg-white/10"
                    placeholder="React, TypeScript, Tailwind CSS"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1">Demo URL</label>
                    <input
                      type="text"
                      name="demo_url"
                      value={formData.demo_url}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border border-gray-300 bg-white/10"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">GitHub URL</label>
                    <input
                      type="text"
                      name="github_url"
                      value={formData.github_url}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border border-gray-300 bg-white/10"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button type="submit">
                    {editingProject ? "Update Project" : "Add Project"}
                  </Button>
                  {editingProject && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Projects List */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-md">
              <h2 className="text-xl font-semibold p-6 border-b border-gray-200/20">Projects List</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center p-12">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="p-6 text-center">
                  <p>No projects found. Add your first project above.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-black/10">
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Technologies</th>
                        <th className="p-4 text-left">Created</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-t border-gray-200/20">
                          <td className="p-4">{project.title}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, i) => (
                                <span 
                                  key={i} 
                                  className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary-foreground/90"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            {new Date(project.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleEdit(project)}
                              >
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleDelete(project.id)}
                                className="text-destructive hover:text-destructive/90"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Admin;
