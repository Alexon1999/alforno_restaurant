from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from restaurant.views import *

app_name = 'restaurantApi'


urlpatterns = [
    # /restaurant/info_restaurant
    path('info_restaurant/', InfoRestaurantView.as_view()),
    path('info_restaurant/<int:pk>/', InfoRestaurantDetailView.as_view()),
    path('update_info_restaurant/', InfoRestaurantUpdateOuverture.as_view()),
    path('categories/', CategoriesView.as_view()),
    path('produits-categories/', ProduitsParCategories.as_view()),
    path('categories/<int:pk>/', CategorieDetailView.as_view()),
    path('produit/', ProduitView.as_view()),
    path('produit/<int:pk>/', ProduitDetailsView.as_view()),

    path('carte/<int:id_categorie>/',
         CategorieAuProduitsView.as_view()),
    path('menu/', MenuView.as_view()),
    path('menu/<int:pk>/', MenuDetailsView.as_view()),
    path('disponibilitePlats/', UpdateProduitDisponibilte.as_view()),
    path('contacts/', FormulaireContactView.as_view()),
    path('create_contact/', FormaulaireContactCreateView.as_view()),
    path('api/token', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
]
