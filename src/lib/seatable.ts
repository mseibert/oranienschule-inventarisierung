const token = import.meta.env.SEATABLE_API_TOKEN;

// Überprüfe ob der Token gesetzt ist
if (!token || token === 'your_token_here') {
  console.error('SEATABLE_API_TOKEN Fehler:', {
    token: token,
    envKeys: Object.keys(import.meta.env).filter(key => key.includes('SEATABLE'))
  });
  throw new Error(
    'SEATABLE_API_TOKEN ist nicht gesetzt. Bitte erstelle eine .env Datei mit deinem Seatable API Token.'
  );
}

export async function getSeatableMetadata(token: string): Promise<SeatableMetadata> {
  const url = 'https://cloud.seatable.io/api/v2.1/dtable/app-access-token/';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Seatable Metadaten:', error);
    throw error;
  }
}

export async function getInventarList(metadata: SeatableMetadata): Promise<InventarTeil> {
  
  const url = `${metadata.dtable_server}api/v2/dtables/${metadata.dtable_uuid}/sql`;
  
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${metadata.access_token}`
    },
    body: JSON.stringify({sql: 'SELECT * FROM Inventarliste LIMIT 3', convert_keys: true})
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Inventarliste:', error);
    throw error;
  }
}

export async function getImageDownloadLink(metadata: SeatableMetadata, images: Array<string[]>): Promise<string[]> {
    const cleanArray = images[0];
  if (!cleanArray) return [];

    const downloadLinksArray = await Promise.all(cleanArray.map(async (image) => {
      const decoded = decodeURI(image);
      const imagePath = `/images/${decoded.split('/images/')[1]}`;
      const url = `https://cloud.seatable.io/api/v2.1/dtable/app-download-link/?path=${encodeURIComponent(imagePath)}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.download_link;
      } catch (error) {
        console.error(`Error fetching download link for image ${image}:`, error);
        return null;
      }
    }));
    return downloadLinksArray.filter((link): link is string => link !== null);

}

export async function getInventarListWithImages(metadata: SeatableMetadata): Promise<InventarTeil> {
  try {
    const inventarList = await getInventarList(metadata);
    
    // Process each item to get image download links
    const processedResults = await Promise.all(
      inventarList.results.map(async (item) => {
        if (item.Bild) {
          try {
            const downloadLink = await getImageDownloadLink(metadata, [item.Bild]);
            return { ...item, Bilddownload: downloadLink };
          } catch (error) {
            console.error(`Fehler beim Abrufen des Bildes für ${item.Name}:`, error);
            return { ...item, Bilddownload: null };
          }
        }
        return { ...item, Bilddownload: null };
      })
    );

    return { ...inventarList, results: processedResults };
  } catch (error) {
    console.error('Fehler in getInventarListWithImages:', error);
    throw error;
  }
}

interface SeatableMetadata {
    app_name: string;
    access_token: string;
    dtable_uuid: string;
    dtable_server: string;
    dtable_socket?: string;
    dtable_db: string;
    workspace_id: number;
    dtable_name: string;
    use_api_gateway: boolean;
  }
  
  export interface InventarTeil {
    results: Array<{
      Name: string;
      Bezeichnung: string;
      Kategorie: string;
      'Hersteller/Marke/Autor/Komponist': string;
      Modell: string;
      Seriennummer: string;
      Anschaffungsdatum: string | null;
      Anschaffungskosten: number;
      Bild: string[] | null;
      Bilddownload: string[] | null;
      Zustand: string | null;
      'Letzte Wartung': string | null;
      Verleihstatus: string;
      Verantwortlich: string;
      Bemerkungen: string;
      'QR-Code': string | null;
      _locked: null;
      _locked_by: null;
      _archived: boolean;
      _creator: string;
      _ctime: string;
      _last_modifier: string;
      _mtime: string;
      _id: string;
    }>;
  }