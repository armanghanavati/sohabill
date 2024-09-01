import { Tooltip } from "react-bootstrap";

type Props = {
    title: string
}

export const Tooltips: React.FC<Props> = ({ title }) => (
    <Tooltip id="tooltip">
        {title}
    </Tooltip>
)



// < OverlayTrigger placement = "top" overlay = { tooltip({ title: "روش صورتحساب" }) } >
