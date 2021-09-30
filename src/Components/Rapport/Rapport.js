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
                    Le projet challenge Open Data nous offre l’opportunité de créer une application web de visualisation interactive, dédiée à l'exploration de données.<br />
                    Dans le cadre de ce projet, nous avons décidé de nous intéresser aux causes de morts dans le monde dont les données sont disponibles sur le site <a href="https://ourworldindata.org/causes-of-death">ourworldindata.org</a> et sont issues de bases de données publiques et libres telles que l’IHME ou Amnesty international. 
                </p>
                
                <h4 class="margin">Description des données</h4>
                <p class="justify">
                    TODO
                </p>

                <h4 class="margin">Traitement des données</h4>
                <p class="justify">
                    TODO
                </p>

                <h4 class="margin">Architecture de l'application</h4>
                <p class="justify">
                    TODO
                </p>

                <h4 class="margin">Technologies</h4>
                <p class="justify">
                    L'application a été réalisée en <span class="bold">React</span>.<br />
                    Les principales bibliothèques utilisées sont les suivantes :<br />
                    &bull; <span class="bold">LeafLet</span> (pour la carte du monde)<br />
                    &bull; <span class="bold">ReactModal</span> (pour les fenêtres type "modale")<br />
                    &bull; <span class="bold">ReactDataTableComponent</span> (pour la liste des causes)<br />
                    &bull; <span class="bold">ReactBootstrap</span> (pour certains styles de bouton)<br />
                    &bull; <span class="bold">FontAwesome</span> (pour les icônes)<br />
                    &bull; <span class="bold">React-ChartJS-2</span> (pour les graphiques en barres horizontales)
                </p>

                <h4 class="margin">GreenIT Analysis</h4>
                <p class="justify">
                    <img src={greenIT_results} alt="Résultats GreenIT Analysis" />
                </p>
            </div>

        <br />
        </div>       
    )
}
export default Rapport;
