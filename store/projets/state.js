export default () => ({
    listprojets: [],

    headerprojets : [
        /* {
            text: 'Username',
            align: 'start',
            sortable: true,
            value: 'username',
        }, */
        { text: 'REF', value: 'reference_projet' },
        { text: 'Nom', value: 'titre_projet' }, 
        { text: 'Bénéficiaire', value: 'beneficiaire' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailprojet :{},
    //Intialise la pagination
    paginationUtilisateur :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})