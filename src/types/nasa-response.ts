export interface NasaApiResponse {
    collection: Collection;
}

export interface Collection {
    version:  string;
    href:     string;
    items:    Array<Item>;
    metadata: Metadata;
    links:    Array<CollectionLink>;
}

export interface Item {
    href:  string;
    data:  Array<Datum>;
    links: Array<ItemLink>;
}

export interface Datum {
    center:             string;
    date_created:       Date;
    description:        string;
    keywords:           Array<string>;
    location?:          string;
    media_type:         MediaType;
    nasa_id:            string;
    photographer?:      string;
    title:              string;
    album?:             Array<string>;
    description_508?:   string;
    secondary_creator?: string;
}


export enum MediaType {
    Image = "image",
    Video = "video",
}


export interface ItemLink {
    href:    string;
    rel:     ItemLinkType;
    render?: MediaType;
    width?:  number;
    size?:   number;
    height?: number;
}


export enum ItemLinkType {
    Alternate = "alternate",
    Canonical = "canonical",
    Captions = "captions",
    Preview = "preview",
}

export interface CollectionLink {
    rel:    "next" | "prev";
    prompt: "Next" | "Previous";
    href:   string;
}

export interface Metadata {
    total_hits: number;
}
