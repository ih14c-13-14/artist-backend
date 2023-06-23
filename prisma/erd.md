```mermaid
erDiagram

        TokenType {
            PASSWORD_RESET PASSWORD_RESET
EMAIL_CHANGE EMAIL_CHANGE
        }
    
  "users" {
    String id "🗝️"
    String email 
    String password 
    Int age_group 
    Int gender 
    DateTime created_at 
    DateTime updated_at 
    }
  

  "prefectures" {
    String id "🗝️"
    String name 
    }
  

  "institutions" {
    String id "🗝️"
    String admission_fee_description 
    DateTime updated_at 
    }
  

  "arts" {
    String id "🗝️"
    Boolean is_public 
    String name 
    String name_kana 
    Int created_year 
    String description 
    String image_path 
    String datetime_description 
    String closed_day_description 
    String address 
    DateTime created_at 
    DateTime updated_at 
    }
  

  "authors" {
    String id "🗝️"
    String name 
    String name_kana 
    String image_path 
    DateTime create_at 
    DateTime updated_at 
    }
  

  "arts_institutions" {

    }
  

  "arts_users" {

    }
  

  "Token" {
    Int id "🗝️"
    String token 
    TokenType type 
    DateTime created_at 
    DateTime updated_at 
    DateTime expired_at 
    }
  
    "users" o|--|| "prefectures" : "prefecture"
    "users" o{--}o "arts_users" : "arts_users"
    "users" o{--}o "Token" : "Token"
    "prefectures" o{--}o "users" : "users"
    "institutions" o{--}o "arts_institutions" : "arts_institutions"
    "arts" o{--}o "arts_institutions" : "arts_institutions"
    "arts" o{--}o "arts_users" : "arts_users"
    "arts" o|--|| "authors" : "authors"
    "authors" o{--}o "arts" : "arts"
    "arts_institutions" o|--|| "arts" : "art"
    "arts_institutions" o|--|| "institutions" : "institution"
    "arts_users" o|--|| "arts" : "art"
    "arts_users" o|--|| "users" : "user"
    "Token" o|--|| "TokenType" : "enum:type"
    "Token" o|--|| "users" : "users"
```
