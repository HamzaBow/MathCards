

const Card = ({front, back}) => {
    return (
        <div className="container-item">
                <div className="card">
                    <div className="font">
                        <h2>{front.question}</h2>
                        <h2>{front.formula}</h2>
                    </div>

                    <div className="back">
                        <h2>{back.comment}</h2>
                        <h2>{back.formula}</h2>
                    </div>
                </div>
        </div>
    )
}

export default Card
