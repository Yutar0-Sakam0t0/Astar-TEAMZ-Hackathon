const DisplayProfileImg = (props) => {

    return (
        <>
            {/* ラジオボタンと画像を含むラベル */}
            <input
                id={props.id}
                type="radio"
                value={props.value}
                name="image"
                className="hidden"
            />
            <label htmlFor={props.htmlFor} className="w-1/3">
                {/* 余白を作成 */}
                <div className="px-3">
                    <img src={props.src} className="w-full" alt={props.alt} />
                </div>
            </label>
        </>
    );
}

export default DisplayProfileImg;

