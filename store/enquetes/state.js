export default () => ({
    listenquetes: [],

    headerenquetes : [
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Région', value: 'region'},
        { text: 'Structure', value: 'structure'},
        { text: 'Source de financement', value: 'source'},
        { text: 'Statut', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headerenqueteavances : [
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Région', value: 'region'},
        { text: 'Structure', value: 'structure'},
        { text: 'Source de financement', value: 'source'},
        { text: 'Dimension', value: 'dimension'},
        { text: 'Pilier', value: 'piliers'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailenquete :{},
    //Intialise la pagination
    paginationenquete :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})