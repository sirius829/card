export interface CardInterface {
    artist: string;
    cmc: number;
    colorIdentity: string[];
    colors: string[];
    foreignNames: ForeignName[];
    id: string;
    imageUrl: string;
    layout: string;
    legalities: Legality[];
    manaCost: string;
    multiverseid: string;
    name: string;
    number: string;
    originalText: string;
    originalType: string;
    power: string;
    printings: string[];
    rarity: string;
    set: string;
    setName: string;
    subtypes: string[];
    text: string;
    toughness: string;
    type: string;
    types: string[];
    variations: string[];
}

interface ForeignName {
    flavour: string;
    imageUrl: string;
    language: string;
    multiverseid: number;
    name: string;
    text: string;
    type: string;
}

interface Legality {
    format: string;
    legality: string;
}