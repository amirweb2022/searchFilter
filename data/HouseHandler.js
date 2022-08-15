class HouseHandler {
    static dataList = new Array();

    static getDataList() {
        return this.dataList;
    }

    static addData(house) {
        if (this.dataList == null) {
            this.dataList = new Array();
        }
        this.dataList.push(house);
    }
}