const token = import.meta.env.SEATABLE_API_TOKEN;


export async function getSeatableMetadata(token: string): Promise<SeatableMetadata> {
  const url = 'https://cloud.seatable.io/api/v2.1/dtable/app-access-token/';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(url, options);
  return response.json();
}

export async function getInventarList(metadata: SeatableMetadata): Promise<InventarTeil> {
  const url = `${metadata.dtable_socket}/api-gateway/api/v2/dtables/${metadata.dtable_uuid}/sql`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${metadata.access_token}`
    },
    body: JSON.stringify({sql: 'SELECT * FROM Inventarliste LIMIT 2', convert_keys: true})
  };

  const response = await fetch(url, options);
  return response.json();

} 

export async function getImageDownloadLink(metadata: SeatableMetadata, images: Array<string[]>): Promise<string[]> {
    const cleanArray = images[0];
  if (!cleanArray) return [];

    console.log('images', typeof cleanArray);
    console.log('stringified', JSON.stringify(cleanArray));
    const downloadLinksArray = await Promise.all(cleanArray.map(async (image) => {
    //   console.log('image', image);
      const decoded = decodeURI(image);
    //   console.log('decoded', decoded);
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
        // console.log('data', data);
        return data.download_link;
      } catch (error) {
        console.error(`Error fetching download link for image ${image}:`, error);
        return null;
      }
    }));
    return downloadLinksArray.filter((link): link is string => link !== null);

}

export async function getInventarListWithImages(metadata: SeatableMetadata): Promise<InventarTeil> {
  const inventarList = await getInventarList(metadata);
  
  // Process each item to get image download links
  const processedResults = await Promise.all(
    inventarList.results.map(async (item) => {
      if (item.Bild) {
        const downloadLink = await getImageDownloadLink(metadata, [item.Bild]);
        return { ...item, Bilddownload: downloadLink };
      }
      return { ...item, Bilddownload: null };
    })
  );

  return { ...inventarList, results: processedResults };
}

interface SeatableMetadata {
    app_name: string;
    access_token: string;
    dtable_uuid: string;
    dtable_server: string;
    dtable_socket: string;
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
      Bild: string | null;
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