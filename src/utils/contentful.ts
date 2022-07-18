import * as contentful from 'contentful';

type BiscuitContentfulEntry = {
    name: contentful.EntryFields.Text;
    slug: contentful.EntryFields.Text;
    duration: contentful.EntryFields.Number;
    barcode: contentful.EntryFields.Text;
    picture: contentful.Asset;
};

export type Biscuit = {
    name: string;
    slug: string;
    duration: number;
    barcode: string;
    pictureURL: string;
};

const BISCUIT_CONTENT_TYPE = 'biscuit';

class ContentfulRepository {
    private _client: contentful.ContentfulClientApi;

    constructor() {
        this._client = contentful.createClient({
            space: process.env.CONTENTFUL_SPACE_ID ?? '',
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
            host: process.env.CONTENTFUL_HOST ?? '',
        });
    }

    private _parseBiscuitEntry(entry: BiscuitContentfulEntry): Biscuit {
        return {
            name: entry.name,
            slug: entry.slug,
            duration: entry.duration,
            barcode: entry.barcode,
            pictureURL: `https:${entry.picture.fields.file.url}`,
        };
    }

    async getBiscuits(): Promise<Biscuit[]> {
        const biscuits = await this._client.getEntries<BiscuitContentfulEntry>({ content_type: BISCUIT_CONTENT_TYPE });

        return biscuits.items.map(({ fields }) => this._parseBiscuitEntry(fields));
    }

    async getBiscuit(slug: string): Promise<Biscuit> {
        const biscuit = await this._client.getEntries<BiscuitContentfulEntry>({
            content_type: BISCUIT_CONTENT_TYPE,
            'fields.slug': slug,
        });

        return this._parseBiscuitEntry(biscuit.items[0].fields);
    }
}

export const getContentfulRepositry = () => new ContentfulRepository();
