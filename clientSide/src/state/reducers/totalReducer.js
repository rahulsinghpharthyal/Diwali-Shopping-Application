const totalReducer = (state=0, action) =>{
    if(action.type === 'total' ){
        return state
    }else {
        return state;                       
    }

}

export default totalReducer;