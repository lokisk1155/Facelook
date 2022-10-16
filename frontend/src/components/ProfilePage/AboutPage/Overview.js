function Overview({ func }) {


    function handleDisposal() {
        return func(false)
    }
    return (
        <p onLoad={() => handleDisposal}>overview</p>
    )

}

export default Overview