import "./Rapport.css"
const Rapport = () => {
    return (
        <div class="rapport">
            <h3>Challenge Open Data - Rapport</h3>
            <p class="pSize marginT">
                <span class="bold">Réalisé par:</span><br />
                &bull; HINDIR Alla<br />
                &bull; LIN William<br />
                &bull; OUADIH Meriem<br />
                &bull; PINTO DA FONSECA Julien<br />
                &bull; TOUDERTI Hiba
            </p>

            <div class="divSize">
                <h4 class="marginT">Introduction</h4>
                <p class="pJustify">
                    Dans le cadre du Challenge Open Data nous avons développé une WebApp, dont le but est de permettre à l’utilisateur la visualisation de manière interactive d’un jeu de données.
                    <br />
                    L'objectif de notre visualisation était de repérer les pricipaux causes de déces et leurs rapports sociaux et économiques.
                </p>

                <h4 class="marginT">Jeu de données</h4>
                <p class="pJustify">

                    Source:
                    <br />
                    Nous avons décidé de nous intéresser aux causes de morts dans le monde dont
                    les données sont disponibles sur le site https://ourworldindata.org/causes-of-death et https://data.worldbank.org/leurs
                    <br/>
                    sources proviennent des bases de données publiques et libres de l’IHME et d’Amnesty
                    international.
                    et regroupe les informations suivantes :Nom de pays ,son code ,le nombre de decés par cause et par année
                    Nous avons également utilisé un autre fichier json qui contient des informations sur la géométrie de chaque pays
                </p>

                <h4 class="marginT">Traitement des données</h4>
                <p class="pJustify">
                    Les données brutes sont proposées par Our World in Data via l'intermédiaire de plusieurs fichiers CSV. Chaque fichier contient de nombreuses données sur les causes de décès .
                    <br/>
                    Nous avons appliqué un prétraitement, à l’aide d’un script en javascript pour transformer le fichier csv en fichier json .Nous avons choisit le top 10 des causes principal de décès et des causes économiques,sociales ...
                    <br/>
                    Ensuite nous utilisons le fichier json  pour en extraire les données qu’on utilise dans les cartes.
                </p>

                <h4 class="marginT">Architecture de l'application</h4>
                <p class="pJustify">
                    Notre projet a été premièrement créé avec le module npm create-react-app
                    <br />
                    En effet, dans le dossier src, nous avons plusieurs sous-dossiers, notamment :
                    <br />
                    /views :contient la vue qui est composé des components
                    <br />
                    /components :éléments constituant la vue principale
                    <br />
                    /assets :contient les dataset et diverses ressources traitées
                    <br />
                    /main.js
                </p>

                <h4 class="marginT">Technologies </h4>
                <p class="pJustify">
                    Pour la création de cette application, nous avons fait appel à plusieurs outils qui sont :
                    <br />
                    -ReactJs :framework javascript permettant de produire une interface utilisateur
                    <br />
                    -Les graphiques sont générés à l'aide des bibliothèques Chart.js
                    <br />
                    -les cartes sont sont générés à l'aide des bibliothèques Leaflet
                </p>

                <h4 class="marginT">Résultat GreenIT Analysis </h4>
                <p class="pJustify">
                    TODO
                </p>
            </div>

            <br />
        </div>
    )
}
export default Rapport;
