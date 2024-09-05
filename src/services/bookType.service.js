function makeTypeService() {
    const baseUrl = '/api/type';
    const headers = {
        'Content-Type': 'application/json',
    }

    async function getTypes() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    };

    async function getTypeById(id) {
        let url = `${baseUrl}/${id}`;
        return await fetch(url).then((res) => res.json());
    }


    return {
        getTypes,
        getTypeById,
    };
};

export default makeTypeService();