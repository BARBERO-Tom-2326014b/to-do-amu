import React from 'react';

function Filtre({
                    filtreEnCours,
                    setFiltreEnCours,
                    filtreTerminees,
                    setFiltreTerminees,
                    triDecroissant,
                    setTriDecroissant,
                    categorieSelectionnee,
                    setCategorieSelectionnee,
                    categories // Catégories passées en prop
                }) {
    return (
        <div className="buttons">
            <button className="filtre" onClick={() => { setFiltreEnCours(!filtreEnCours); setFiltreTerminees(false); }}>
                {filtreEnCours ? "Afficher toutes les tâches" : "Afficher tâches en cours"}
            </button>
            <button className="filtre" onClick={() => { setFiltreTerminees(!filtreTerminees); setFiltreEnCours(false); }}>
                {filtreTerminees ? "Afficher toutes les tâches" : "Afficher tâches terminées"}
            </button>
            <button className="tri" onClick={() => setTriDecroissant(!triDecroissant)}>
                Trier par échéance {triDecroissant ? "↑ Croissant" : "↓ Décroissant"}
            </button>

            {/* Ajout du select pour filtrer par catégorie */}
            <select
                value={categorieSelectionnee}
                onChange={(e) => setCategorieSelectionnee(e.target.value)}
                className="categorieSelect"
            >
                <option value="">Sélectionner une catégorie</option>
                {categories && categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filtre;
