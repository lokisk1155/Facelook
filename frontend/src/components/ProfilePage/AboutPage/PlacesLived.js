function PlacesLived({ func }) {


    function handleDisposal() {
        return func(false)
    }

    return (
        <p onLoad={() => handleDisposal}>PlacesLived</p>
    )

}

export default PlacesLived