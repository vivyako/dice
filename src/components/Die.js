export default function Die(props) {
    return (
        <div className="die-face" onClick={() => props.holdDice(props.id)}
        style={{backgroundColor: props.isHeld ? "#59e391" : "#f5f5f5"}}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    );
}