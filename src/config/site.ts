export type SiteConfig = {
  name: string;
  tagline: string;
  whatsapp: string;
  phone: string;
  address: string;
  city: string;
  hours: string;
  instagram: string;
  facebook: string;
  mapsUrl: string;
  deliveryZones: string[];
  leadTimeText: string;
};

export const siteConfig: SiteConfig = {
  name: "Esperanza Muebles",
  tagline: "Muebles de madera hechos para durar",
  whatsapp: "", // TODO(cliente): agregar en formato 595XXXXXXXXX
  phone: "", // TODO(cliente): confirmar teléfono público
  address: "", // TODO(cliente): confirmar dirección del taller o showroom
  city: "", // TODO(cliente): confirmar ciudad
  hours: "", // TODO(cliente): confirmar horarios de atención
  instagram: "https://www.instagram.com/esperanzamuebless/",
  facebook: "", // TODO(cliente): agregar URL de Facebook
  mapsUrl: "", // TODO(cliente): agregar URL o embed de Google Maps
  deliveryZones: [], // TODO(cliente): confirmar zonas de entrega
  leadTimeText: "", // TODO(cliente): confirmar plazo estimado de fabricación
};

export const developerCredit = ""; // TODO(cliente): agregar crédito del desarrollador si corresponde
