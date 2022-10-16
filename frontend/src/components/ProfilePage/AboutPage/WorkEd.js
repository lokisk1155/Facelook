function WorkEd({ func }) {


    function handleDisposal() {
        return func(false)
    }

    return (
        
        <p onLoad={() => handleDisposal}>work and education</p>
    )
}

export default WorkEd