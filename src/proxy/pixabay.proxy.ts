import axios, { AxiosResponse, AxiosError } from 'axios';
import { PIXABAY_KEY } from '../consts/environment-variables';
import logger from '../utils/logger';

const PIXABAY_API = 'https://pixabay.com/api/?key={KEY}&image_type=photo';

const buildAPI = ({ key }: { key: string }): string => {
    return PIXABAY_API.replace('{KEY}', key);
};

interface PIXABAY_RESPONSE {
    total: number;
    totalHits: number;
    hits: Array<{
        id: number;
        pageURL: string;
        type: string;
        tags: string;
        previewURL: string;
        previewWidth: number;
        previewHeight: number;
        webformatURL: string;
        webformatWidth: number;
        webformatHeight: number;
        largeImageURL: string;
        fullHDURL: string;
        imageURL: string;
        imageWidth: number;
        imageHeight: number;
        imageSize: number;
        views: number;
        downloads: number;
        likes: number;
        comments: number;
        user_id: number;
        user: string;
        userImageURL: string;
    }>;
}

export const getImagesRequest = (): Promise<PIXABAY_RESPONSE> => {
    const api = buildAPI({ key: PIXABAY_KEY });

    return axios
        .get(api)
        .then((response: AxiosResponse) => {
            return response.data as PIXABAY_RESPONSE;
        })
        .catch((error: AxiosError) => {
            logger.error(null, 'failed to retrieve images', { error: error.response });
            return { total: 0, totalHits: 0, hits: [] } as PIXABAY_RESPONSE;
        });
};
