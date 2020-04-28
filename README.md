
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


### Association
- has_many :messages
- has_many :users, through: :groups_users
- has_many :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|group|references|null: false|
|user|references|null: false|


### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group