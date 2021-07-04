from django.urls import path

from . import views

app_name = 'restaurant'


urlpatterns = [
    # /paiement/commandes
    path('commandes', views.CommandeView.as_view()),
    path('commandes/<int:pk>', views.CommandeDetailView.as_view()),
    path('create-commande', views.CommandeCreateView.as_view()),
    path('update-commande', views.UpdateCommande.as_view()),
    path('nouvelle-commande', views.NouvelleCommande.as_view()),
    path('nombres-nouvelle-commande', views.getNombreNouvellesCommandes),
    path('commande-encours', views.CommandeEnCours.as_view()),
    path('historique-commande', views.HistoriqueCommande.as_view()),
    path('paniers', views.PanierView.as_view()),
    path('create-client-secret', views.CreateClientSecret.as_view()),
    # /paiement/paniers-items
    # path('paniers-items/', views.Panier_itemView.as_view()),
    path('stripe/transactions',
         views.ListStripeTransactions.as_view())
]
