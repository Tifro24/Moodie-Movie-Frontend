interface OpenUrlButtonProps {
    url: string;
    label: string
}

function OpenUrlButton(props: OpenUrlButtonProps) {
    return(
        <button onClick={() => window.open(props.url, "_blank")}>
            {props.label}
        </button>
    )
}

export default OpenUrlButton