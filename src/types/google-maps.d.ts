
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      addListener(eventName: string, handler: Function): void;
    }
    
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map?: Map | null, anchor?: Marker): void;
    }
    
    class Size {
      constructor(width: number, height: number);
    }
    
    class Point {
      constructor(x: number, y: number);
    }
    
    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      styles?: any[];
    }
    
    interface MarkerOptions {
      position?: LatLngLiteral;
      map?: Map | null;
      title?: string;
      icon?: string | MarkerIcon;
    }
    
    interface MarkerIcon {
      url: string;
      scaledSize?: Size;
      anchor?: Point;
    }
    
    interface InfoWindowOptions {
      content?: string;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
  }
}

export {};
