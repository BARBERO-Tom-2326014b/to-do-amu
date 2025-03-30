import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Filtre from '../Filtre/Filtre';
import './taches.css';

function Taches({ taches, categorie, relation }) {
    const [tachesState, setTachesState] = useState(taches);
    const [relationsState, setRelationsState] = useState(relation);
    const [filtreEnCours, setFiltreEnCours] = useState(false);
    const [filtreTerminees, setFiltreTerminees] = useState(false);
    const [triDecroissant, setTriDecroissant] = useState(true);
    const [categories, setCategories] = useState(categorie);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState('');

    const marquerCommeTerminee = (id) => {
        setTachesState(prevTaches =>
            prevTaches.map(tache =>
                tache.id === id ? { ...tache, done: !tache.done } : tache
            )
        );
    };

    const ajouterTache = (nouvelleTache) => {
        setTachesState(prevTaches => [...prevTaches, nouvelleTache]);
        if (nouvelleTache.categorie) {
            setRelationsState(prevRelations => [
                ...prevRelations,
                { tache: nouvelleTache.id, categorie: nouvelleTache.categorie }
            ]);
        }
    };

    const modifierTache = (id, updatedTache) => {
        setTachesState(prevTaches =>
            prevTaches.map(tache =>
                tache.id === id ? { ...tache, ...updatedTache } : tache
            )
        );
    };

    const tachesFiltreesEtTriees = [...tachesState]
        .filter(tache => {
            if (filtreEnCours) return !tache.done;
            if (filtreTerminees) return tache.done;
            if (categorieSelectionnee) {
                const relationTache = relationsState.find(r => r.tache === tache.id);
                if (relationTache && String(relationTache.categorie) === String(categorieSelectionnee)) {
                    return true;
                }
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date_echeance.split('/').reverse().join('-'));
            const dateB = new Date(b.date_echeance.split('/').reverse().join('-'));
            return triDecroissant ? dateB - dateA : dateA - dateB;
        });

    return (
        <div>
            <Filtre
                filtreEnCours={filtreEnCours}
                setFiltreEnCours={setFiltreEnCours}
                filtreTerminees={filtreTerminees}
                setFiltreTerminees={setFiltreTerminees}
                triDecroissant={triDecroissant}
                setTriDecroissant={setTriDecroissant}
                categorieSelectionnee={categorieSelectionnee}
                setCategorieSelectionnee={setCategorieSelectionnee}
                categories={categories}
            />

            <ul>
                {tachesFiltreesEtTriees.map((tache) => (
                    <AfficheTache
                        key={tache.id}
                        tache={tache}
                        categorie={categories}
                        relation={relationsState}
                        marquerCommeTerminee={marquerCommeTerminee}
                        modifierTache={modifierTache}
                    />
                ))}
            </ul>

            <Footer
                ajouterTache={ajouterTache}
                categorie={categories}
                setCategorie={setCategories}
            />
        </div>
    );
}

function AfficheTache({ tache, categorie, relation, marquerCommeTerminee, modifierTache }) {
    const [ouvert, setOuvert] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTache, setEditedTache] = useState({ ...tache });

    const relationTache = relation.find((r) => r.tache === tache.id);
    const tacheCategorie = relationTache ? categorie.find((c) => c.id === relationTache.categorie) : null;

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTache({ ...editedTache, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        modifierTache(tache.id, editedTache);
        setIsEditing(false);  // Exit editing mode
    };

    return (
        <li>
            <div className="Taches" onClick={() => setOuvert(!ouvert)}>
                <h3 className="titre">{tache.title}</h3>
                <div className="TacheInfo">
                    <span className="TacheDate">📅 {tache.date_echeance}</span>
                    {tacheCategorie && (
                        <span className="TacheCategorie" style={{ color: tacheCategorie.color }}>
                            | {tacheCategorie.title}
                        </span>
                    )}
                </div>
                <label className="checkbox" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={tache.done}
                        onChange={() => marquerCommeTerminee(tache.id)}
                    />
                    {tache.done ? " ✅ Terminée" : " ⏳ En cours"}
                </label>
                <button onClick={() => setIsEditing(true)}>Modifier</button>
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="TacheDetails">
                    <input
                        type="text"
                        name="title"
                        value={editedTache.title}
                        onChange={handleEditChange}
                    />
                    <input
                        type="date"
                        name="date_echeance"
                        value={editedTache.date_echeance}
                        onChange={handleEditChange}
                    />
                    <textarea
                        name="description"
                        value={editedTache.description}
                        onChange={handleEditChange}
                    />
                    <button type="submit">Enregistrer</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
                </form>
            )}

            {ouvert && !isEditing && (
                <div className="TacheDetails">
                    <p className="TacheDescription">📅 Date de création : {tache.date_creation}</p>
                    <p className="TacheDescription">⏳ Date d'échéance : {tache.date_echeance}</p>
                    <p className="TacheDescription">📝 Description : {tache.description || "Aucune description"}</p>
                </div>
            )}
        </li>
    );
}

export default Taches;
