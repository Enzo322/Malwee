import { GroupComponent } from "./group/group.component";
import { SubGrupoComponent } from "./sub-grupo/sub-grupo.component";
import { UserComponent } from "./user/user.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupos',
        icon : 'assessment',
        component: GroupComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        component: UserComponent,
    },
    {
        path: 'subGroup',
        caption : 'Sub-Grupo',
        icon : 'equalizer',
        component: SubGrupoComponent,
    }
    ,
    {
        path: 'colection',
        caption : 'Coleção',
        icon : 'equalizer',
        component: SubGrupoComponent,
    }
    ,
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'equalizer',
        component: SubGrupoComponent,
    }
]