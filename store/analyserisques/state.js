export default () => ({
    listenquetes: [],

    headerenquetes : [
        { text: 'REF Projet', value: 'projet' },
        { text: 'Bénéficiaire', value: 'beneficiaire'},
        { text: 'Commune', value: 'commune'},
        { text: 'Département', value: 'departement'},
        { text: 'Région', value: 'region'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headerenqueteavances : [
        { text: 'REF Projet', value: 'projet' },
        { text: 'Bénéficiaire', value: 'beneficiaire'},
        { text: 'Commune', value: 'commune'},
        { text: 'Département', value: 'departement'},
        { text: 'Région', value: 'region'},
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