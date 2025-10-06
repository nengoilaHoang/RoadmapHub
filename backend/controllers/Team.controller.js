import TeamService from "../services/Team.service.js";

class TeamController {
    getTeamByUserId = async (req, res, next) => {
        const userId = req.authenticate.id;
        //console.log("Account ID:", userId);
        const teams = await TeamService.getTeamByUserId(userId);
        //console.log("Teams:", teams);
        if (teams) {
            return res.status(200).json({ status: true, teams });
        }
        return res.status(404).json({ status: false, message: "Team not found" });
    };
}
export default new TeamController();
