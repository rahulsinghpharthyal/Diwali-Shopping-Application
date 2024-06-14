export const totalAmount = (total) =>{
    return (dispatch)=>{
        dispatch({
            type: 'total',
            payload: total
        })                                                                                                     
    }
}