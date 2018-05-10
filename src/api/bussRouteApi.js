import * as constants from "../constants/constants";

class BussRouteApi {

    static loadBussStations() {
        {
            return fetch(constants.HTTP_SERVER_URL + '/buss-routes')
                .then(response => response.json());
        }
    }

    static loadBussStation(line) {
        {
            return fetch(constants.HTTP_SERVER_URL + `/buss-routes/${line}`)
                .then(response => response.json());
        }
    }

    static loadLineNumbers() {
        {
            return fetch(constants.HTTP_SERVER_URL + `/buss-routes/line-numbers`)
                .then(response => response.json());
        }
    }

}

export default BussRouteApi;
