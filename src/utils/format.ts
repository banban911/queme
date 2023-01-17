import {LanguageEdge, LanguageType} from "../types/user";
import moment from "moment/moment";

const getMainLang = (langs: LanguageType) => {
    if (langs.edges && langs.nodes) {
        const sizeArray = langs.edges.map((lang: LanguageEdge) => {
            return lang.size;
        }) as number[];
        const largestSize = Math.max(...sizeArray);
        const largestSizelangIdx = sizeArray.indexOf(largestSize);
        return langs.nodes[largestSizelangIdx];
    }
};

const updateTs = (ts: string) => {
    if (moment(new Date()).diff(moment(ts), "days") < 2) {
        return moment(ts).fromNow();
    } else {
        return moment(ts).format("MM DD, YYYY");
    }
};

const kFormatter = (num: any) => {
    return num > 999
        ? `${Math.sign(num) * Number((num / 1000).toFixed(1))}k`
        : Math.sign(num) * num;
};


export {
    getMainLang,
    updateTs,
    kFormatter
}
