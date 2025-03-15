class Model {
    constructor(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    setData(newData) {
        this.data = newData;
    }

    // Additional methods for interacting with the data layer can be added here
}

export default Model;