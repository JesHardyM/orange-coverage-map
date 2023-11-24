import { Request, Response } from 'express';
import LocationNetworkQuality from '../models/locationNetworkQualityModel';
import User from '../models/userModel';
import { geocode } from '../utils/geocode'; 

export const postLocation = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, rtt, downlink, network, userUuid } = req.body;
    const city = await geocode(latitude, longitude);
    // Verifica si el usuario con el UUID proporcionado existe
    const user = await User.findOne({ where: { uuid: userUuid } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Si el usuario existe, crea el registro de calidad de red asociado
    const locationNetworkQuality = await LocationNetworkQuality.create({
      user_uuid: userUuid, // Usa el UUID del usuario
      latitude,
      longitude,
      rtt,
      downlink,
      city,
      network
    });

    res.status(201).json(locationNetworkQuality);
  } catch (error) {
    console.error('Error en postLocation:', error); 
    res.status(500).json({ error: error.message });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await LocationNetworkQuality.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

