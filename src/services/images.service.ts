import { getImagesRequest } from '../proxy/pixabay.proxy';
import { getFromCache, storeInCache } from '../dbs/caching';

export const getImagesServiceHandler = async (totalImages: number) => {
    const cacheData = getFromCache();
    if (cacheData && !cacheData?.length) {
        return cacheData.slice(0, totalImages);
    }

    const data = await getImagesRequest();

    const results = data.hits.map((pr) => pr.previewURL);
    storeInCache(results);

    return results;
};
