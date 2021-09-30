import greenIT_results from '../../Resources/greenIT_results.png'
import "./Rapport.css"
const Rapport = () => {
    return (
        <div class="rapport">
            <h3>Challenge Open Data - Rapport</h3>
            <p class="pSize margin">
                <span class="bold">Réalisé par:</span><br />
                &bull; HINDIR Alla<br />
                &bull; LIN William<br />
                &bull; OUADIH Meriem<br />
                &bull; PINTO DA FONSECA Julien<br />
                &bull; TOUDERTI Hiba
            </p>

            <div class="divSize">
                <h4 class="margin">Introduction</h4>
                <p class="justify">
                    Dans le cadre du Challenge Open Data nous avons développé une WebApp, dont le but est de permettre à l’utilisateur la visualisation de manière interactive d’un jeu de données.
                    <br />
                    L'objectif de notre visualisation était de repérer les principales causes de décès ainsi que leurs rapports sociaux et économiques.
                </p>

                <h4 class="margin">Jeu de données</h4>
                <p class="justify">
                    Dans le cadre de ce projet, nous avons décidé de nous intéresser aux causes de morts dans le monde dont les données sont disponibles sur les sites <a href="https://ourworldindata.org/causes-of-death">ourworldindata.org</a> et <a href="https://data.worldbank.org/">data.worldbank.org</a>.<br />
                    Ces données sont par ailleurs sont issues de bases de données publiques et libres telles que l’IHME ou Amnesty international.<br />
                    On y retrouve notamment les informations suivantes : nom de pays avec le code associé, le nombre de décès catégorisé par cause et par année...<br />
                    Nous avons également utilisé un fichier JSON qui contient des informations sur la géométrie de chaque pays.<br />
                </p>

                <h4 class="margin">Traitement des données</h4>
                <p class="justify">
                    Les données brutes sont proposées par <a href="https://ourworldindata.org/">Our World in Data</a> via l'intermédiaire de plusieurs fichiers CSV. Chaque fichier contenant diverses données sur les causes de décès.<br />
                    Nous avons ensuite appliqué un pré-traitement de ces données, à l’aide d’un script javascript permettant de transformer le fichier CSV en fichier JSON.<br />
                    Enfin, nous avons retenu le top 10 des principales causes de décès (ou des causes économiques, sociales...).
                </p>

                <h4 class="margin">Architecture de l'application</h4>
                <p class="justify">
                    Notre projet a été initialement créé avec le module <span class="bold">npm create-react-app</span>.<br />
                    À cet effet, dans le dossier src se trouvent plusieurs sous-dossiers :<br />
                    &bull; <span class="bold">/views</span> : contient la vue qui est composé des components<br />
                    &bull; <span class="bold">/components</span> : éléments constituant la vue principale<br />
                    &bull; <span class="bold">/assets</span> : contient les dataset et diverses ressources traitées<br />
                    &bull; <span class="bold">/main.js</span>
                </p>

                <h4 class="margin">Technologies </h4>
                <p class="justify">
                    L'application a été réalisée en <span class="bold">React</span>.<br />
                    Les principales bibliothèques utilisées sont les suivantes :<br />
                    &bull; <span class="bold">LeafLet</span>, pour la génération des cartes<br />
                    &bull; <span class="bold">React-ChartJS-2</span>, pour la génération de graphiques<br />
                    &bull; <span class="bold">ReactModal</span>, pour l'utilisation des fenêtres type "modale"<br />
                    &bull; <span class="bold">ReactDataTableComponent</span>, pour afficher la liste des causes<br />
                    &bull; <span class="bold">ReactBootstrap</span>, pour utiliser certains styles prédéfinis (boutons par exemple)<br />
                    &bull; <span class="bold">FontAwesome</span>, pour les icônes
                </p>

                <h4 class="margin">GreenIT Analysis</h4>
                <p class="justify">
                    <img src={greenIT_results} alt="Résultats GreenIT Analysis" />
                </p>
            </div>
        </div>
    )
}
export default Rapport;
