/*
import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {IPost} from '../../model/Post';

/!**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 *!/
interface SavedNode {
  name: string;
  children?: IPost;
}

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  savedPosts: IPost[];

  TREE_DATA: SavedNode[] = [
    {
      name: 'Fruit',
      children: [
       this.savedPosts[1]
      ]
    }
  ];

  treeControl = new NestedTreeControl<SavedNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SavedNode>();

  hasChild = (_: number, node: SavedNode) => !!node.children && node.children.length > 0;

  constructor() {

  }

  ngOnInit() {


    this.dataSource.data = TREE_DATA;
  }

}
*/
