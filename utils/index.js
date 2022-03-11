import moment from "moment";
import Intl from "intl";
import 'intl/locale-data/jsonp/it-IT'

export const vndFormat = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
});