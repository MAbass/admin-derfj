export default () => ({
    listprojets: [],

    headerprojets : [
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Région', value: 'region'},
        { text: 'Structure', value: 'structure'},
        { text: 'Source de financement', value: 'source'},
        { text: 'Statut', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headerprojetavances : [
        { text: 'Année', value: 'annee' },
        { text: 'Monnaie', value: 'monnaie'},
        { text: 'Région', value: 'region'},
        { text: 'Structure', value: 'structure'},
        { text: 'Source de financement', value: 'source'},
        { text: 'Dimension', value: 'dimension'},
        { text: 'Pilier', value: 'piliers'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailprojet :{},
    //Intialise la pagination
    paginationprojet :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})