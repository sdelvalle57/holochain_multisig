module.exports = {
    Error: (err)=> {
        if(err.Internal) {
            try {
                err = JSON.parse(err.Internal)
            } catch(e) {
                return {error: err.Internal}
            }
        }
        return  {
            error : getKind(err.kind)
        }
    }
}

const getKind = (kind) => {
    if(kind.ValidationFailed) return kind.ValidationFailed
    else "Server Error"
}
    
