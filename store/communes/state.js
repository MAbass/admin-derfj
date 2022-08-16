export default () => ({
    listcommunes: [],

    headercommunes : [
        {
            text: 'Nom',
            align: 'start',
            sortable: true,
            value: 'nom_commune',
        },
        { text: 'Slug', value: 'slug' },
        { text: 'Latitude', value: 'latitude' },
        { text: 'Longitude', value: 'longitude' },
        /* { text: 'Status', value: 'status' }, */
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailcommune :{}
})