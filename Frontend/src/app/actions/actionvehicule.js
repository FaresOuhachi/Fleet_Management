import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

// Fonction pour récupérer tous les véhicules
const fetchVehicles = async () => {
  const response = await axios.get("http://localhost:5000/api/v1/vehicule");
  console.log(response.data)
  return response.data;
};

// Hook pour récupérer tous les véhicules
export const useFetchVehicles = () => {
  return useQuery("vehicules", fetchVehicles);
};

//

//

// Fonction pour récupérer les véhicules à partir d'une recherche simple
const fetchSearchVehicles = async (searchTerm) => {
  const response = await axios.get(`/api/vehicles?search=${searchTerm}`);
  return response.data;
};

// Fonction pour récupérer les véhicules à partir d'une recherche avancée
const fetchAdvancedSearchVehicles = async (searchParams) => {
  const response = await axios.post(
    `/api/vehicles/advanced-search`,
    searchParams
  );
  return response.data;
};

// Hook pour récupérer les véhicules d'une recherche simple
export const useSearchVehicles = (searchTerm) => {
  return useQuery(["searchVehicles", searchTerm], () =>
    fetchSearchVehicles(searchTerm)
  );
};

// Hook pour récupérer les véhicules d'une recherche avancée
export const UseAdvancedSearchVehicles = (searchParams) => {
  return useQuery(["advancedSearchVehicles", searchParams], () =>
    fetchAdvancedSearchVehicles(searchParams)
  );
};

//

//

// Hook pour créer un nouveau véhicule
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  const createVehicle = async (newVehicle) => {
    const response = await axios.post("/api/vehicles", newVehicle);
    return response.data;
  };

  return useMutation(createVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries("vehicles");
    },
  });
};

// Hook pour mettre à jour un véhicule
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  const updateVehicle = async (vehicle) => {
    const response = await axios.put(`/api/vehicles/${vehicle.id}`, vehicle);
    return response.data;
  };

  return useMutation(updateVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries("vehicles");
    },
  });
};

// Hook pour supprimer un véhicule
export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  const deleteVehicle = async (vehicleId) => {
    const response = await axios.delete(`/api/vehicles/${vehicleId}`);
    return response.data;
  };

  return useMutation(deleteVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries("vehicles");
    },
  });
};

// Marque

//

// Fonction pour récupérer tous les Marques
export const fetchMarque = async () => {
  const response = await axios.get("/api/marques");
  return response.data;
};

// Hook pour récupérer tous les Marques
export const useFetchMarque = () => {
  return useQuery("marque", fetchMarque);
};

// Hook pour créer une nouvelle Marque
export const useCreateMarque = () => {
  const queryClient = useQueryClient();

  const createMarque = async (newmarque) => {
    const response = await axios.post("/api/marques", newmarque);
    return response.data;
  };

  return useMutation(createMarque, {
    onSuccess: () => {
      queryClient.invalidateQueries("marques");
    },
  });
};

// Hook pour mettre à jour une Marque
export const useUpdateMarque = () => {
  const queryClient = useQueryClient();

  const updateMarque = async (marque) => {
    const response = await axios.put(`/api/marques/${marque.id}`, marque);
    return response.data;
  };

  return useMutation(updateMarque, {
    onSuccess: () => {
      queryClient.invalidateQueries("marques");
    },
  });
};

// Hook pour supprimer une Marque
export const useDeleteMarque = () => {
  const queryClient = useQueryClient();

  const deleteMarque = async (marqueId) => {
    const response = await axios.delete(`/api/marques/${marqueId}`);
    return response.data;
  };

  return useMutation(deleteMarque, {
    onSuccess: () => {
      queryClient.invalidateQueries("marques");
    },
  });
};

// Modele

//

// Fonction pour récupérer tous les Modeles
export const fetchModele = async () => {
  const response = await axios.get("/api/modeles");
  return response.data;
};

// Hook pour récupérer tous les Modeles
export const useFetchModele = () => {
  return useQuery("modele", fetchModele);
};

// Hook pour créer un nouveau Modele
export const useCreateModele = () => {
  const queryClient = useQueryClient();

  const createModele = async (newmodele) => {
    const response = await axios.post("/api/modeles", newmodele);
    return response.data;
  };

  return useMutation(createModele, {
    onSuccess: () => {
      queryClient.invalidateQueries("modeles");
    },
  });
};

// Hook pour mettre à jour un Modele
export const useUpdateModele = () => {
  const queryClient = useQueryClient();

  const updateModele = async (modele) => {
    const response = await axios.put(`/api/modeles/${modele.id}`, modele);
    return response.data;
  };

  return useMutation(updateModele, {
    onSuccess: () => {
      queryClient.invalidateQueries("modeles");
    },
  });
};

// Hook pour supprimer un Modele
export const useDeleteModele = () => {
  const queryClient = useQueryClient();

  const deleteModele = async (modeleId) => {
    const response = await axios.delete(`/api/modeles/${modeleId}`);
    return response.data;
  };

  return useMutation(deleteModele, {
    onSuccess: () => {
      queryClient.invalidateQueries("modeles");
    },
  });
};

// Categorie

//

// Fonction pour récupérer tous les categories
export const fetchCategorie = async () => {
  const response = await axios.get("/api/categories");
  return response.data;
};

// Hook pour récupérer tous les categories
export const useFetchCategorie = () => {
  return useQuery("categorie", fetchCategorie);
};

// TypeCarburant

//

// Fonction pour récupérer tous les TypeCarburant
export const fetchTypeCarburant = async () => {
  const response = await axios.get("/api/TypeCarburant");
  return response.data;
};

// Hook pour récupérer tous les TypeCarburant
export const useFetchTypeCarburant = () => {
  return useQuery("TypeCarburant", fetchTypeCarburant);
};

// TypeV

//

// Fonction pour récupérer tous les TypeV
export const fetchTypeV = async () => {
  const response = await axios.get("/api/TypeV");
  return response.data;
};

// Hook pour récupérer tous les TypeV
export const useFetchTypeV = () => {
  return useQuery("TypeV", fetchTypeV);
};
