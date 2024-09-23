import {Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function OneWallet({name, desc, sharedWallets, money, id}) {

    const navigate = useNavigate();

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card>
                <CardContent>
                    <Typography variant={"h4"} component={"div"}>
                        {name}
                    </Typography>
                    <Typography variant={"h5"}>
                        {money} HUF
                    </Typography>
                    <Typography variant={"body1"}>
                        {desc}
                    </Typography>
                    <Typography variant={"body2"} component={"div"} sx={{marginTop: "1em"}}>
                        Shared with:
                        {sharedWallets.map((e, i) => {
                            return <Chip key={i} label={e.name} size={"small"} />
                        })}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size={"small"} onClick={() => navigate(`/wallet/${id}`)}>Details</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default OneWallet;