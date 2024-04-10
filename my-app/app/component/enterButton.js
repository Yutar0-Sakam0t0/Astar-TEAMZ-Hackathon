const EnterButton = (props) => {

    return (

        <div className="container mt-4">
            <div className="flex justify-center">
                <button
                    onClick={props.onClick}
                    className="w-2/3 btn text-center py-2 px-4 rounded-full text-white text-xl drop-shadow-lg"
                    style={{ backgroundColor: props.bgColor }}>{props.text}
                </button>
            </div>
        </div>

    );
}

export default EnterButton;

