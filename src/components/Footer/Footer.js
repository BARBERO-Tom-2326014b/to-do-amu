import React, { useState } from 'react';

function Footer({ ajouterTache, categorie, setCategorie }) {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [dateEcheance, setDateEcheance] = useState('');
    const [categorieId, setCategorieId] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [categorieFormVisible, setCategorieFormVisible] = useState(false);
    const [nouvelleCategorie, setNouvelleCategorie] = useState('');
    const [categorieColor, setCategorieColor] = useState('#000000');  // Couleur par défaut pour la catégorie

    // Fonction pour ajouter une tâche
    const handleSubmitTache = (e) => {
        e.preventDefault();

        if (!titre || !dateEcheance || !categorieId) {
            alert("Veuillez remplir tous les champs obligatoires !");
            return;
        }

        const nouvelleTache = {
            id: Date.now(),
            title: titre,
            description,
            date_creation: new Date().toLocaleDateString(),
            date_echeance: dateEcheance,
            done: false,
            categorie: Number(categorieId) // Stocker la catégorie comme ID
        };

        ajouterTache(nouvelleTache);
        setFormVisible(false); // Fermer le formulaire après l'ajout
    };

    // Fonction pour ajouter une catégorie
    const handleSubmitCategorie = (e) => {
        e.preventDefault();

        if (!nouvelleCategorie) {
            alert("Veuillez entrer un nom pour la catégorie !");
            return;
        }

        const nouvelleCategorieObj = {
            id: Date.now(),
            title: nouvelleCategorie,
            color: categorieColor
        };

        setCategorie(prevCategories => [...prevCategories, nouvelleCategorieObj]);
        setCategorieFormVisible(false);  // Fermer le formulaire après l'ajout
        setNouvelleCategorie('');  // Réinitialiser le champ de la catégorie
    };

    return (
        <div className="footer">
            {/* Bouton d'ajout de tâche */}
            {!formVisible ? (
                <button onClick={() => setFormVisible(true)} className="ajouterTacheBtn">
                    Ajouter une tâche
                </button>
            ) : (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setFormVisible(false)}>&times;</span>
                        <form onSubmit={handleSubmitTache}>
                            <input
                                type="text"
                                placeholder="Titre de la tâche"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                value={dateEcheance}
                                onChange={(e) => setDateEcheance(e.target.value)}
                                required
                            />
                            <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)} required>
                                <option value="">Sélectionner une catégorie</option>
                                {categorie.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <button type="submit">Ajouter la tâche</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Bouton pour ajouter une catégorie */}
            <button onClick={() => setCategorieFormVisible(true)} className="ajouterCategorieBtn">
                Ajouter une catégorie
            </button>

            {/* Formulaire d'ajout de catégorie */}
            {categorieFormVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setCategorieFormVisible(false)}>&times;</span>
                        <form onSubmit={handleSubmitCategorie}>
                            <input
                                type="text"
                                placeholder="Nom de la catégorie"
                                value={nouvelleCategorie}
                                onChange={(e) => setNouvelleCategorie(e.target.value)}
                                required
                            />
                            <input
                                type="color"
                                value={categorieColor}
                                onChange={(e) => setCategorieColor(e.target.value)}
                            />
                            <button type="submit">Ajouter la catégorie</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Footer;
