import { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface WarModeContextType {
  warMode: boolean;
  warModeLevel: number;
  activateWarMode: (level: number, areas: string[], instructions: string[]) => Promise<void>;
  deactivateWarMode: () => Promise<void>;
  toggleWarMode: () => void;
  loading: boolean;
}

const WarModeContext = createContext<WarModeContextType>({
  warMode: false,
  warModeLevel: 1,
  activateWarMode: async () => {},
  deactivateWarMode: async () => {},
  toggleWarMode: () => {},
  loading: false,
});

export const useWarMode = () => useContext(WarModeContext);

interface WarModeProviderProps {
  children: ReactNode;
}

export const WarModeProvider = ({ children }: WarModeProviderProps) => {
  const [warMode, setWarMode] = useState(false);
  const [warModeLevel, setWarModeLevel] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch the current war mode status
  const { data, isLoading: loading } = useQuery({
    queryKey: ['/api/war-mode'],
    onSuccess: (data) => {
      if (data) {
        setWarMode(data.isActive);
        setWarModeLevel(data.level);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch war mode status",
        variant: "destructive",
      });
    }
  });

  // Mutation to update war mode status
  const updateWarModeMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('PUT', '/api/war-mode', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/war-mode'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update war mode status",
        variant: "destructive",
      });
    }
  });

  const activateWarMode = async (level: number, affectedAreas: string[], instructions: string[]) => {
    try {
      await updateWarModeMutation.mutateAsync({
        isActive: true,
        level,
        activatedAt: new Date(),
        deactivatedAt: null,
        affectedAreas: JSON.stringify(affectedAreas),
        instructions: JSON.stringify(instructions)
      });

      setWarMode(true);
      setWarModeLevel(level);

      toast({
        title: "War Mode Activated",
        description: `Emergency Level ${level} protocols are now active`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Failed to activate war mode:", error);
    }
  };

  const deactivateWarMode = async () => {
    try {
      await updateWarModeMutation.mutateAsync({
        isActive: false,
        deactivatedAt: new Date()
      });

      setWarMode(false);

      toast({
        title: "War Mode Deactivated",
        description: "Emergency protocols have been deactivated",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to deactivate war mode:", error);
    }
  };

  // For demo purposes, simply toggle war mode state
  const toggleWarMode = () => {
    if (warMode) {
      deactivateWarMode();
    } else {
      // Default to level 3 for demo purposes with sample data
      const sampleAreas = ["North District", "East District", "Central District"];
      const sampleInstructions = [
        "All CSPs in affected areas must suspend regular operations",
        "Enable offline transaction mode immediately",
        "Priority service to military and emergency personnel",
        "Cash withdrawal limits increased for emergency aid",
        "Report to district coordinator every 2 hours"
      ];
      activateWarMode(3, sampleAreas, sampleInstructions);
    }
  };

  return (
    <WarModeContext.Provider
      value={{
        warMode,
        warModeLevel,
        activateWarMode,
        deactivateWarMode,
        toggleWarMode,
        loading
      }}
    >
      {children}
    </WarModeContext.Provider>
  );
};
