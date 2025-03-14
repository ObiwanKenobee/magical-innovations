
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  demo_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Exception fetching projects:", error);
    toast.error("Failed to load projects");
    return [];
  }
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      return null;
    }
    
    toast.success("Project created successfully");
    return data;
  } catch (error) {
    console.error("Exception creating project:", error);
    toast.error("Failed to create project");
    return null;
  }
};

export const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
      return null;
    }
    
    toast.success("Project updated successfully");
    return data;
  } catch (error) {
    console.error("Exception updating project:", error);
    toast.error("Failed to update project");
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      return false;
    }
    
    toast.success("Project deleted successfully");
    return true;
  } catch (error) {
    console.error("Exception deleting project:", error);
    toast.error("Failed to delete project");
    return false;
  }
};
