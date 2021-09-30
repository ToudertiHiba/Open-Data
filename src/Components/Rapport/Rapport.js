import greenIT_results from '../../Resources/greenIT_results.png'
import "./Rapport.css"
const Rapport = () => {
    return (
        <div class="rapport">
            <h3>Challenge Open Data 2021 - Rapport</h3>
            <p class="pSize margin">
                <span class="bold">Réalisé par :</span><br />
                &bull; HINDIR Alla<br />
                &bull; LIN William<br />
                &bull; OUADIH Meriem<br />
                &bull; PINTO DA FONSECA Julien<br />
                &bull; TOUDERTI Hiba
            </p>

            <div class="divSize">
                <h4 class="margin">Introduction</h4>
                <p class="justify">
                    Dans le cadre du Challenge Open Data nous avons développé une WebApp, dont le but est de permettre à l’utilisateur de visualiser de manière interactive un jeu de données.
                    <br />
                    L'objectif de notre visualisation était de repérer les principales causes de décès dans le monde ainsi que leurs rapports sociaux et économiques.
                </p>

                <h4 class="margin">Jeu de données</h4>
                <p class="justify">
                    Dans le cadre de ce projet, nous avons décidé de nous intéresser aux causes de morts dans le monde dont les données sont disponibles sur les sites <a href="https://ourworldindata.org/causes-of-death">ourworldindata.org</a> et <a href="https://data.worldbank.org/">data.worldbank.org</a>.<br />
                    Ces données sont par ailleurs issues des bases de données publiques et libres des institutions telles que l’IHME ou Amnesty international.<br />
                    On y retrouve notamment les informations suivantes : nom de pays avec le code associé, le nombre de décès catégorisé par cause et par année...<br />
                    Nous avons également utilisé un fichier JSON qui contient des informations sur la géométrie de chaque pays.<br /><br />
                    <span>Observations :</span><br />
                    Nous pouvons remarquer une croissance des causes de décès lié à la santé (maladies) qui peut s'expliquer par la croissance démographique, <br />
                    Nous pouvons également remarquer qu'il s'agit principalement d'une croissances des maladies de civilisations (lié au mode de vie). <br />
                    Mais nous constatons également un déclin des causes de décès lié à la nutrition et l'hygiène.<br />
                    Nous pouvons expliquer cela par un meilleur accès aux soins et une amélioration globale du niveau et des conditions de vie des individus. <br /><br />
                    <span>Critiques :</span><br />
                    Nous constatons une augmentation des causes de décès lié au maladies, mais nous ne montrons pas l'évolution de la population sur cette même période donc il se peut que cette croissance est mécanique, elle ne signifie pas nécessairement qu'il existe un facteur aggravant.<br />
                </p>

                <h4 class="margin">Traitement des données</h4>
                <p class="justify">
                    Les données brutes sont proposées par <a href="https://ourworldindata.org/">Our World in Data</a> via l'intermédiaire de plusieurs fichiers CSV. Chaque fichier contenant diverses données sur les causes de décès.<br />
                    Nous avons ensuite appliqué un pré-traitement de ces données, à l’aide d’un script javascript permettant de transformer le fichier CSV en fichier JSON.<br />
                    Ce pré-traitement consiste d'abord à réaliser l'aggrégation des entrées issus du fichier .csv par pays puis de leur associer les causes de décès groupés par année.<br />
                    Enfin, nous avons retenu les 10 principales causes de décès (ou des causes économiques, sociales...).
                </p>

                <h4 class="margin">Architecture de l'application</h4>
                <p class="justify">
                    Notre projet a été initialement créé avec le module <span class="bold">npm create-react-app</span>.<br />
                    À cet effet, dans le dossier <span class="bold">./src</span> se trouvent plusieurs sous-dossiers et fichiers:<br />
                    &bull; <span class="bold">/Components</span> : éléments constituant la vue principale<br />
                    &bull;&nbsp;&nbsp;&nbsp;&nbsp; <span class="bold">/BarChat</span> : éléments constituant la fenêtre modale affichant un graphe en bâton<br />
                    &bull;&nbsp;&nbsp;&nbsp;&nbsp; <span class="bold">/Map</span> : éléments constituant la vue principales de la Map<br />
                    &bull;&nbsp;&nbsp;&nbsp;&nbsp; <span class="bold">/NavBar</span> : éléments constituant le conteneur de la Map<br />
                    &bull;&nbsp;&nbsp;&nbsp;&nbsp; <span class="bold">/Rapport</span> : éléments constituant le contenu du rapport<br />
                    &bull; <span class="bold">/Data</span> : contient les dataset, le script de traitement et les données traités prêt à être exploités<br />
                    &bull; <span class="bold">/Ressources</span> : contient diverses ressources (une image du rapport GreenIt)<br />
                    &bull; <span class="bold">/Utils</span> : contient les fonctions utilitaires (regression linéaire)<br />
                    &bull; <span class="bold">/App.js</span> : contient la vue principale qui est composé du composant Map<br />
                </p>

                <h4 class="margin">Technologies </h4>
                <p class="justify">
                    Nous avons profité de ce projet pour nous initié à une technologie populaire du web.<br/>
                    L'application a donc été réalisée en <span class="bold">React</span>.<br />
                    Les principales bibliothèques utilisées sont les suivantes :<br />
                    &bull; <span class="bold">LeafLet</span>, pour la génération des cartes<br />
                    &bull; <span class="bold">React-ChartJS-2</span>, pour la génération de graphiques<br />
                    &bull; <span class="bold">ReactModal</span>, pour l'utilisation des fenêtres type "modale"<br />
                    &bull; <span class="bold">ReactDataTableComponent</span>, pour afficher la liste des causes<br />
                    &bull; <span class="bold">ReactBootstrap</span>, pour utiliser certains styles prédéfinis (boutons par exemple)<br />
                    &bull; <span class="bold">FontAwesome</span>, pour les icônes <br/>
                </p>

                <h4 class="margin">GreenIT Analysis</h4>
                <p class="justify">
                    <img src={greenIT_results} alt="Résultats GreenIT Analysis" /><br/>
                    Le minimalisme et le caractère serverless du projet nous garantie un faible impact écologique.
                </p>

                <h4 class="margin">Github</h4>
                <p class="justify">
                    Pour plus aller plus loin, vous trouverez les sources dans le dépôt Git suivant: <a href="https://github.com/ToudertiHiba/Open-Data/">Open-Data</a>
                </p>
            </div>
        </div>
    )
}
export default Rapport;
