import * as constants from "../constants/constants";

class BussStationApi {

    static loadBussStations() {
        {
            console.log("calling " + constants.HTTP_SERVER_URL);

            return fetch(constants.HTTP_SERVER_URL + '/buss-routes')
                .then((response) => {
                    console.log("stations from server response", response);

                    return response.json();
                })
                .then((responseJson) => {
                    console.log(responseJson);

                    return responseJson;
                })
        }

    }
}

export default BussStationApi;
