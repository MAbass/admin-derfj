export default {
    initlist(state, newlist) {
        state.listprojets = newlist
    },
    initheader(state, newlist) {
        state.headerprojets = newlist
    },
    initheaderavance(state, newlist) {
        state.headerprojetavances = newlist
    },
    initdetail(state, newprojet) {
        state.detailprojet = newprojet
    },
    inittotalpage(state, newtotalpage) {
        state.totalPage = newtotalpage
    },
    initperpage(state, newtperpage) {
        state.perPage = newtperpage
    },
    initcurrentpage(state, newtperpage) {
        state.currentPage = newtperpage
    },
    initdatasearch(state, newdatasearch) {
        state.dataSearch = newdatasearch
    },
    removeItem(state,payload) {
        console.log('item to delete ++++++++ ',payload)
        state.listprojets = state.listprojets.filter(item => item.id != payload)
    }
}